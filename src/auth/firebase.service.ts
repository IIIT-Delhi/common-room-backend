import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import * as serviceAccount from '../config/firebase.json';

const firebase_params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class FirebaseService {
    private defaultApp: any;
    private auth: any;

    constructor(private configService: ConfigService) {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
            databaseURL: this.configService.get<string>('firebase.db'),
        });
        this.auth = this.defaultApp.auth();
    }

    async validateToken(token: string): Promise<any> {
        const firebaseUser: any = await this.auth
            .verifyIdToken(token, true)
            .catch((err) => {
                throw new UnauthorizedException(err.message);
            });
        if (!firebaseUser) {
            throw new UnauthorizedException();
        }
        return firebaseUser;
    }
}
