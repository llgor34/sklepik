export function sendErrorMessage(res, code, message) {
	return res.status(code).send({ ok: false, message });
}
