import { attr, belongsTo, hasMany } from '@ember-decorators/data';
import DS from 'ember-data';

import CommentModel from './comment';
import ContributorModel from './contributor';
import NodeModel from './node';
import RegistrationSchemaModel, { RegistrationMetadata } from './registration-schema';
import RegistryProviderModel from './registry-provider';
import UserModel from './user';

export default class RegistrationModel extends NodeModel.extend() {
    @attr('date') dateRegistered!: Date;
    @attr('boolean') pendingRegistrationApproval!: boolean;
    @attr('boolean') archiving!: boolean;
    @attr('boolean') embargoed!: boolean;
    @attr('date') embargoEndDate!: Date | null;
    @attr('boolean') pendingEmbargoApproval!: boolean;
    @attr('boolean') withdrawn!: boolean;
    @attr('fixstring') withdrawalJustification?: string;
    @attr('boolean') pendingWithdrawal!: boolean;
    @attr('fixstring') registrationSupplement?: string;
    @attr('object') registeredMeta!: RegistrationMetadata;

    // Write-only attributes
    @attr('fixstring') draftRegistration?: string;
    @attr('fixstring') registrationChoice?: 'immediate' | 'embargo';
    @attr('date') liftEmbargo?: Date;

    @belongsTo('node', { inverse: 'registrations' })
    registeredFrom!: DS.PromiseObject<NodeModel> & NodeModel;

    @belongsTo('user', { inverse: null })
    registeredBy!: DS.PromiseObject<UserModel> & UserModel;

    @belongsTo('registry-provider', { inverse: 'registrations' })
    provider!: DS.PromiseObject<RegistryProviderModel> & RegistryProviderModel;

    @hasMany('contributor', { inverse: 'node' })
    contributors!: DS.PromiseManyArray<ContributorModel>;

    @hasMany('comment', { inverse: 'node' })
    comments!: DS.PromiseManyArray<CommentModel>;

    @belongsTo('registration-schema', { inverse: null })
    registrationSchema!: DS.PromiseObject<RegistrationSchemaModel> & RegistrationSchemaModel;

    @belongsTo('registration', { inverse: 'children' })
    parent!: DS.PromiseObject<RegistrationModel> & RegistrationModel;

    @hasMany('registration', { inverse: 'parent' })
    children!: DS.PromiseManyArray<RegistrationModel>;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        registration: RegistrationModel;
    } // eslint-disable-line semi
}
