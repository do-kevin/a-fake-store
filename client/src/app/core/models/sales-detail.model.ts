export interface SalesDetailStateModel {
    creditcard: {
        cardholder: string;
        number: string;
        expiration: string;
        cvc: string;
        avs_street: string;
        avs_postalcode: string;
    };
}
