// 'extern' is deprecated in favor of 'roaming' but kept for compatibility purposes
export type AuthType = 'auto' | 'local' | 'extern' | 'roaming' | 'both'


// TODO: although algo "-8" is currently only used optionally by a few security keys,
// it would not harm to support it for the sake of completeness
export type NumAlgo = -7 | -257
export type NamedAlgo = 'RS256' | 'ES256'


export interface AuthenticateOptions {
    userVerification?: UserVerificationRequirement
    authenticatorType?: AuthType
    timeout?: number
    debug?: boolean
    mediation?: CredentialMediationRequirement;
}


export interface AuthenticationEncoded {
    credentialId: string
    //userHash: string, // unreliable, optional for authenticators
    authenticatorData: string
    clientData: string
    signature: string
}

export interface AuthenticationParsed {
    credentialId: string
    //userHash: string, // unreliable, optional for authenticators
    authenticator: AuthenticatorInfo
    client: ClientInfo,
    signature: string
}


export interface RegisterOptions extends AuthenticateOptions {
    attestation?: boolean
}


export interface CredentialKey {
    id: string
    publicKey: string
    algorithm: 'RS256' | 'ES256'
}


export interface RegistrationEncoded {
    username: string
    credential: CredentialKey
    authenticatorData: string
    clientData: string
    attestationData?: string
}

export interface RegistrationParsed {
    username: string
    credential: {
        id: string
        publicKey: string
        algorithm: 'RS256' | 'ES256'
    }
    authenticator: AuthenticatorInfo
    client: ClientInfo
    attestation?: any
}

export interface ClientInfo {
    type: "webauthn.create" | "webauthn.get"
    challenge: string
    origin: string
    crossOrigin: boolean
    tokenBindingId?: {
        id: string
        status: string
    }
    extensions?: any
}

export interface AuthenticatorInfo {
    rpIdHash: string,
    flags: {
        userPresent: boolean
        userVerified: boolean
        backupEligibility: boolean
        backupState: boolean
        attestedData: boolean
        extensionsIncluded: boolean
    }
    counter: number
    aaguid: string
    name: string
}

interface AuthenticationExtensionsClientInputs {
    appid?: string;
    credProps?: boolean;
    hmacCreateSecret?: boolean;
    prf: { eval: { first: {} } }
}

export interface PublicKeyCredentialCreationOptions {
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    challenge: BufferSource;
    excludeCredentials?: PublicKeyCredentialDescriptor[];
    extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    rp: PublicKeyCredentialRpEntity;
    timeout?: number;
    user: PublicKeyCredentialUserEntity;
}

export interface PublicKeyCredentialRequestOptions {
    allowCredentials?: PublicKeyCredentialDescriptor[];
    challenge: BufferSource;
    extensions?: AuthenticationExtensionsClientInputs;
    rpId?: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
}
