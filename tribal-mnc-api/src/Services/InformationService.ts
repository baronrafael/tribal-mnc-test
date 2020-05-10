import * as rqt from 'request-promise-native';

class InformationService {

    public async getInfo(param: string, type: string, limit: string) {
        const iTunesUrl = 'https://itunes.apple.com/search?term=' + param + '&media=' + type + '&limit=' + limit;
        return JSON.parse(await rqt.get({uri: iTunesUrl}));
    }

}

export default InformationService;