import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import { promisify } from 'util';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) throw new BadRequestException('email in use');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      const privateKeyPath = path.join(__dirname, '../../key/private.key');

      const privateKey = await fs.promises.readFile(privateKeyPath, 'utf8');
      const jwtBearerToken = jwt.sign({}, privateKey, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: user.id.toString(),
      });

      return [jwtBearerToken, user];
    } else {
      throw new BadRequestException('bad password');
    }
  }
}
