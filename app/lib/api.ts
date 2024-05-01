import { 
    ContentTypeError, 
    ResponseStatusError, 
    SchemaError 
} from "../errors/apiErrors";
import { ApiGetSchema } from "../schema/apiGetSchema";
import env from './validateEnv';

const apiFetch = async () => {
    // try {
        const response = await fetch(env.API_URL, {method: "GET"});
        if(!response.ok) {
            throw new ResponseStatusError(response.status);
        }
        const contentType = response.headers.get("content-type");
        if(contentType !== env.API_CONTENT_TYPE) {
            throw new ContentTypeError(contentType); 
        }

        const parseResult = await ApiGetSchema.safeParseAsync(await response.json());
        if(!parseResult.success) {
            throw new SchemaError(parseResult.error);
        }

        return parseResult.data;
}


export default apiFetch;