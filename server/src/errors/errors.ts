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
		console.log(err.getResponse());

		return err.getResponse();
		// return c.text(err.message);

		// return c.json({ message: err.message }, err.status);
	}

	return c.json({ message: 'unexpected error' }, 500);
}
