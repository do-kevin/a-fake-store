import express from 'express';
import usaepayClient from '../services/usaepay-service';

const router = express.Router();

router.post('/process_token_sale', async (req, res) => {
    const {
        cardholder,
        number,
        expiration,
        cvc,
        avs_street,
        avs_postalcode,
    } = req.body;

    try {
        const { data } = await usaepayClient.createToken({
            cardholder,
            number,
            expiration,
            cvc,
            avs_street,
            avs_postalcode,
        });

        const { creditcard, savedcard } = data;

        const response = await usaepayClient.processTokenSale({
            creditcard: {
                ...creditcard,
                number: savedcard.key,
            },
            amount: '17.00',
        });

        const { result, error } = response.data;

        if (result === 'Error') {
            throw new Error(error);
        }

        return res.status(200).send({
            data: response.data,
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
});

router.post('/process_payment_key_sale', async (req, res) => {
    const { payment_key, amount } = req.body;

    try {
        const response = await usaepayClient.processPaymentKeySale({
            payment_key,
            amount,
        });

        const { result, error } = response.data;

        if (result === 'Error') {
            throw new Error(error);
        }

        return res.status(200).send({
            data: response.data,
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
});

export default router;
