import axios from "axios";
import CONFIG from "./urlConfig";


class SystemService {
    execute(url, data, headers, method) {
        switch (method) {
            case 'POST':
                return axios.post(url, data, headers);
            case 'PUT':
                return axios.put(url, data, headers);
            default:
                break;
        }
    }

    listService() {
        const url = CONFIG.LIST_SERVICE;
        return axios.get(url);
    }
    listGroup(id) {
        const url = CONFIG.LIST_GROUP.replace("{id}", id);
        return axios.get(url);
    }

    listEncryption() {
        const url = CONFIG.LIST_ENCRYPTION;
        return axios.get(url);
    }
    listApiMethod() {
        const url = CONFIG.LIST_API_METHOD
        return axios.get(url);
    }

    createService({ serviceName, serverUrl, group }) {
        const data = {
            name: serviceName,
            serverUrl: serverUrl,
            group: group,
            status: 'ACTIVE'

        }
        const url = CONFIG.CREATE_SERVICE;
        let a = axios.post(url, data);
        return a
    }
    createApi({ serviceName, serverUrl, group }) {
        const data = {
            name: serviceName,
            serverUrl: serverUrl,
            group: group,
            status: 'ACTIVE'

        }
        const url = CONFIG.CREATE_SERVICE;
        let a = axios.post(url, data);
        return a
    }
}

export default new SystemService();
