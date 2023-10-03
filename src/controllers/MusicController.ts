import data from '../json/music.json';
import { music } from './interfaces/IMusic';

class musicController {
  public getAllData(): Array<music>{
    return data;
  }
  public getDataById(id: string): Array<music> {
    const response = data.filter(item => item._id.$oid == id)
    return response
  }
}

export default musicController;