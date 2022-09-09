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

    getAllService() {
        const url = CONFIG.LIST_SYSTEM_SERVICE_URL;
        return axios.get(url);
    }

    getPaymentTermByUuid(companyUuid, ptUuid) {
        const url = CONFIG.GET_DETAILS_PAYMENT_TERM_URL.replace("{companyUuid}", companyUuid).replace("{ptUuid}", ptUuid);
        return axios.get(url);
    }

    createPaymentTerm(companyUuid, { ptName, ptDays, ptRemarks }) {
        const data = {
            ptName,
            ptDays,
            ptRemarks
        };
        const url = CONFIG.CREATE_PAYMENT_TERM_URL.replace("{companyUuid}", companyUuid);
        return axios.post(url, data);
    }

    updatePaymentTerm(companyUuid, { ptUuid, ptRemarks, ptName, ptDays }) {
        const data = {
            ptUuid,
            ptRemarks,
            ptName,
            ptDays,
        };
        const url = CONFIG.UPDATE_PAYMENT_TERM_URL.replace("{companyUuid}", companyUuid);
        return axios.put(url, data);
    }
}

export default new SystemService();
