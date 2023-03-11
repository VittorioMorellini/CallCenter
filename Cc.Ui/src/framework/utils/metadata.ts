import 'reflect-metadata';

function isObject(val: any) {
	return val && (typeof val === 'function' || typeof val === 'object');
}

interface MetadataType {
	resource: string;
	paramTypes: string;
	propertyType: string;
	properties: string;

	get(metadataKey: string, target: Function, targetKey?: any): Object | undefined;
	getOwn(metadataKey: string, target: Function, targetKey?: any): Object | undefined;
	define(metadataKey: string, metadataValue: Object, target: Function, targetKey?: any): void;
	getOrCreateOwn(metadataKey: string, Type: any, target: Function, targetKey?: any): Object | undefined;
}

const metadata: MetadataType = {
	resource: 'sx:resource',
	paramTypes: 'design:paramtypes',
	propertyType: 'design:type',
	properties: 'design:properties',

	get(metadataKey: string, target: Function, targetKey?: string): Object | undefined {
		if (!isObject(target)) {
			return undefined;
		}
		let result = metadata.getOwn(metadataKey, target, targetKey);
		return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
	},

	getOwn(metadataKey: string, target: Function, targetKey?: any): Object | undefined {
		if (!isObject(target)) {
			return undefined;
		}
		return Reflect.getOwnMetadata(metadataKey, target, targetKey);
	},

	define(metadataKey: string, metadataValue: Object, target: Function, targetKey?: any): void {
		Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	},

	getOrCreateOwn(metadataKey: string, Type: any, target: Function, targetKey?: any): Object | undefined {
		let result = metadata.getOwn(metadataKey, target, targetKey);

		if (result === undefined) {
			result = new Type();
			Reflect.defineMetadata(metadataKey, result, target, targetKey);
		}

		return result;
	}
};

export default metadata;