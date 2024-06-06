import {schema} from 'normalizr';

export enum EntityKeys {
  COMPANIES = 'companies',
}

type TRelations = {[key: string]: schema.Entity<any> | schema.Array<any>};

function SchemaCreator(key: EntityKeys, relations?: TRelations) {
  const entity = new schema.Entity(key, relations, {
    idAttribute: 'ticker',
  });
  return {
    entity,
    list: new schema.Array(entity),
  };
}

export const CompanySchema = SchemaCreator(EntityKeys.COMPANIES);
