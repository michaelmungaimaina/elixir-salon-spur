// Rating class implementation
class Rating {
    constructor(clientName, clientEmail, clientPhone, clientType, comment, stars, feedback) {
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone
        this.clientType = clientType;
        this.comment = comment;
        this.stars = stars;
        this.feedback = feedback;
    }

    // Getters
    getClientName() {
        return this.clientName;
    }

    getClientEmail() {
        return this.clientEmail;
    }

    getClientPhone() {
        return this.clientPhone;
    }

    getClientType() {
        return this.clientType;
    }

    getComment() {
        return this.comment;
    }

    getStars() {
        return this.stars;
    }

    getFeedback() {
        return this.feedback;
    }

    // Setters
    setClientName(clientName) {
        this.clientName = clientName;
    }

    setClientEmail(clientEmail) {
        this.clientEmail = clientEmail;
    }

    setClientPhone(clientPhone) {
        this.clientPhone = clientPhone;
    }

    setClientType(clientType) {
        this.clientType = clientType;
    }

    setComment(comment) {
        this.comment = comment;
    }

    setStars(stars) {
        this.stars = stars;
    }

    setFeedback(feedback) {
        this.feedback = feedback;
    }
}