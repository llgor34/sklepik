export function sendErrorMessage(res, code, message) {
    return res.status(code).send({ ok: false, message });
}

export function sendSuccessMessage(res, data = null, successMessage = null) {
    const resObj = { ok: true, message: 'SUCCESS', data: null };

    if (data) {
        resObj.data = data;
    }

    if (successMessage) {
        resObj.message = successMessage;
    }

    res.send(resObj);
}
