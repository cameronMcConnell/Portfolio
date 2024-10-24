class LocalStorage {
    constructor() {
        this.storage = {};
    }

    getItem(key) {
        return this.storage[key];
    }

    setItem(key, value) {
        this.storage[key] = value;
    }
}

const localStorage = new LocalStorage();

class RateGuardJS {
    #urlTotalRequests
    #urlFirstAccessTimes
    
    constructor(totalAllowedRequests, totalRequestsWindowMins, timeoutMinutes) {
        this.totalAllowedRequests = totalAllowedRequests;
        this.totalRequestsWindowMins = totalRequestsWindowMins;
        this.timeoutMinutes = timeoutMinutes;
        this.#urlTotalRequests = this.#loadUrlTotalRequests() || {};
        this.#urlFirstAccessTimes = this.#loadUrlFirstAccessTimes() || {};
    }

    async sendRequest(url, params, requestHandler) {
        const currentTime = Date.now();

        if (!this.#urlTotalRequests[url]) {
            this.#urlTotalRequests[url] = 0;
            this.#urlFirstAccessTimes[url] = currentTime;
            this.#saveUrlFirstAccessTimes();
        }

        const timeElapsed = this.#msToMins(currentTime - this.#urlFirstAccessTimes[url]);

        if (timeElapsed > this.totalRequestsWindowMins) {
            this.#urlTotalRequests[url] = 0;
            this.#urlFirstAccessTimes[url] = currentTime;
            this.#saveUrlFirstAccessTimes();
        }

        this.#urlTotalRequests[url] += 1;
        this.#saveUrlTotalRequests();

        if (this.#urlTotalRequests[url] >= this.totalAllowedRequests) {
            await this.#delay(this.timeoutMinutes * 60 * 1000);
        }

        return requestHandler(url, params);
    }

    #msToMins(ms) {
        return ms / 1000 / 60;
    }

    #delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    #loadUrlTotalRequests() {
        const value = localStorage.getItem("urlTotalRequests");
        return value ? JSON.parse(value) : null;
    }

    #saveUrlTotalRequests() {
        localStorage.setItem("urlTotalRequests", JSON.stringify(this.#urlTotalRequests));
    }

    #loadUrlFirstAccessTimes() {
        const value = localStorage.getItem("urlFirstAccessTimes");
        return value ? JSON.parse(value) : null;
    }

    #saveUrlFirstAccessTimes() {
        localStorage.setItem("urlFirstAccessTimes", JSON.stringify(this.#urlFirstAccessTimes));
    }
}

async function getPinnedGithubProjects() {
    async function requestHandler(url, params) {
        const response = await fetch(url, params);
        return response.json();
    }

    const rateGuardJS = new RateGuardJS(3, 1, 5);
    
    const url = 'https://cameronmcconnell.net/projects';
    const params = { method: 'GET' };

    try {
        const data = await rateGuardJS.sendRequest(url, params, requestHandler);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

for (let req = 1; req < 7; ++req) {
    (async () => {
        try {
            const data = await getPinnedGithubProjects();
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    })();
}