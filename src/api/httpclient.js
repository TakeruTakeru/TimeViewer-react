
export default class ServerAdapter {
    static async get(url){
      console.log('get')
      const fetchURL = url;
      const response = await fetch(fetchURL).then(res => {
        return res;
      });
      return response;
    }
}