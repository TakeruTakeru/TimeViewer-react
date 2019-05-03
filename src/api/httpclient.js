
export default class ServerAdapter {
    static async get(url){
      const fetchURL = url;
      const response = await fetch(fetchURL).then(res => {
        if (res.status !== 200) {
          return null;
        }
        return res.text();
      });   
      return JSON.parse(response);
    }
}