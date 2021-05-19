export interface SignProps {
    user_id: string;
};

export interface Tokens {
    sign(payload: SignProps): string;
    verify(token: string): SignProps | boolean;
}