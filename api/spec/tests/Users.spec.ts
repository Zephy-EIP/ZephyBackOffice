import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@/server';
import UserDao from '@/daos/User/UserDao.mock';
import User, { IUser } from '@/entities/User';
import { pErr } from '@/shared/functions';
import { IReqBody, IResponse } from '../support/types';

describe('Users Routes', () => {

    // const usersPath = '/api/users';

    // const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    // let agent: SuperTest<Test>;

    // beforeAll((done) => {
    //     agent = supertest.agent(app);
    //     done();
    // });

    // describe(`"GET:${getUsersPath}"`, () => {

    //     it(`should return a JSON object with all the users and a status code of "${OK}" if the
    //         request was successful.`, (done) => {
    //         // Setup spy
    //         const users = [
    //             new User('Sean Maxwell', 'sean.maxwell@gmail.com'),
    //             new User('John Smith', 'john.smith@gmail.com'),
    //             new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
    //         ];
    //         spyOn(UserDao.prototype, 'getAll').and.returnValue(Promise.resolve(users));
    //         // Call API
    //         agent.get(getUsersPath)
    //             .end((err: Error, res: IResponse) => {
    //                 pErr(err);
    //                 expect(res.status).toBe(OK);
    //                 // Caste instance-objects to 'User' objects
    //                 const respUsers = res.body.users;
    //                 const retUsers: User[] = respUsers.map((user: IUser) => {
    //                     return new User(user);
    //                 });
    //                 expect(retUsers).toEqual(users);
    //                 expect(res.body.error).toBeUndefined();
    //                 done();
    //             });
    //     });

    //     it(`should return a JSON object containing an error message and a status code of
    //         "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
    //         // Setup spy
    //         const errMsg = 'Could not fetch users.';
    //         spyOn(UserDao.prototype, 'getAll').and.throwError(errMsg);
    //         // Call API
    //         agent.get(getUsersPath)
    //             .end((err: Error, res: IResponse) => {
    //                 pErr(err);
    //                 expect(res.status).toBe(BAD_REQUEST);
    //                 expect(res.body.error).toBe(errMsg);
    //                 done();
    //             });
    //     });
    // });

});
