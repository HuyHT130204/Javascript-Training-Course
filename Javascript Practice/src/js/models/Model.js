export class Model {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async postData(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    }

    async updateData(endpoint, id, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }

    async deleteData(endpoint, id) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
} 
