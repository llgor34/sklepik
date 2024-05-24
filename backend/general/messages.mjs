export function sendErrorMessage(res, code, message) {
    return res.status(code).send({ ok: false, message });
}

export function sendSuccessMessage(res, data = null, successMessage = null) {
    const resObj = { ok: true, message: 'SUCCESS', data: null };

    if (data !== null) {
        resObj.data = data;
    }

    if (successMessage !== null) {
        resObj.message = successMessage;
    }

    res.send(resObj);
}
