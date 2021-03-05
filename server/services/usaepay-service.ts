import axios from 'axios';
import { nanoid } from 'nanoid';
import randomstring from 'randomstring';
import { SALE_COMMAND, SAVE_COMMAND } from '../const/commands';
const shajs = require('sha.js');

interface CreditCard {
    cardholder?: string;
    number: string;
    expiration: string;
    cvc?: string;
    avs_street?: string;
    avs_postalcode?: string;
}

interface SaleDetails {
    amount: string;
    creditcard: CreditCard;
}

class UsaepayClient {
    private instance: any;

    constructor(private apiKey: string) {
        this.instance = this.createInstance(this.apiKey);
    }

    createInstance = (apiKey: string) => {
        const token = this.setBasicAuthToken(apiKey);

        return axios.create({
            baseURL: process.env.USAEPAY_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    };

    setBasicAuthToken = (apiKey: string) => {
        const seed = randomstring.generate(16);
        const apiPin = process.env.USAEPAY_API_PIN;
        const prehash = apiKey + seed + apiPin;
        const apihash =
            's2/' +
            seed +
            '/' +
            new shajs('sha256').update(prehash).digest('hex');
        const authKey = Buffer.from(apiKey + ':' + apihash).toString('base64');
        const basicAuthToken = 'Basic ' + authKey;
        return basicAuthToken;
    };

    reset = () => {
        this.instance = this.createInstance(this.apiKey);
    };

    async createToken(creditcard: CreditCard) {
        try {
            const response = await this.instance({
                method: 'post',
                data: {
                    command: SAVE_COMMAND,
                    creditcard,
                },
                url: '/transactions',
            });

            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async processTokenSale(saleDetails: SaleDetails) {
        try {
            const response = await this.instance({
                method: 'post',
                data: {
                    command: SALE_COMMAND,
                    ...saleDetails,
                    key: nanoid(),
                },
                url: '/transactions',
            });

            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async processPaymentKeySale(paymentDetails: {
        payment_key: string;
        amount: string;
    }) {
        try {
            const response = await this.instance({
                method: 'post',
                data: {
                    command: SALE_COMMAND,
                    ...paymentDetails,
                },
                url: '/transactions',
            });

            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

const usaepayClient = new UsaepayClient(process.env.USAEPAY_API_KEY || '');

export default usaepayClient;
