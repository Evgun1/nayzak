// import { log } from "console";
// import { MiddlewareHandler } from "hono";

import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

// const test: MiddlewareHandler = (c)=>{
// return c.error
// }

// export default test

export default function errors(err: Error, c: Context) {
	if (err instanceof HTTPException) {
		return err.getResponse();
		// c.res.
		// c.status(err.status);
		// return c.text(err.message);
		// c.res.statusText = err.message

		// return c.json({ message: err.message }, err.status);
	}

	return c.json({ message: 'unexpected error' }, 500);
}
