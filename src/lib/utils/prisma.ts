import superjson from 'superjson';

type ReplaceType<Type, FromType, ToType> = Type extends FromType
  ? ToType
  : Type extends object
    ? ReplaceTypes<Type, FromType, ToType>
    : Type;

type ReplaceTypes<ObjType extends object, FromType, ToType> = {
  [KeyType in keyof ObjType]: ReplaceType<ObjType[KeyType], FromType, ToType>;
};

/*
 * To strip certain disallowed values like Symbols from object keys
 * in Prisma extended objects so that they can be passed between the
 * server/client boundary.
 * https://github.com/prisma/prisma/issues/20627
 */
// Ideally we should replace the types, but the generic below was replacing
// other types like Date, and it's unexpected
// Will leave commented for now
// export function deserialize<T extends object>(value: T): ReplaceTypes<T, Decimal, string> {
//
export function serialize<T extends object>(value: T): T {
  return superjson.parse(superjson.stringify(value));
}
