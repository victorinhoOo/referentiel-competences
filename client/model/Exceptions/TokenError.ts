/**
 * Levée lors d'une erreur lié au token d'authentification
 */
class TokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TokenError";
    }
}