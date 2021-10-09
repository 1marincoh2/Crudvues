import { Api } from '~/common/baseApi'
import { UserModel } from '~/type/user.model'

export class userService {
    private http = Api.Http;

    public async userGet () {
      return await this.http.get('/system/users').then(res => res.data)
    }

    public async userPost (nuevoUser: UserModel) {
      return await this.http.post('/system/users', nuevoUser).then(res => res.data)
    }

    public async userPatch (upUser: UserModel) {
      return await this.http.patch('/system/users/' + upUser.id, upUser).then(res => res.data)
    }
    public async userDelete (deletUser: UserModel) {
        return await this.http.delete('/system/users/' + deletUser.id).then(res => res.data)
    }
}
