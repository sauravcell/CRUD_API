export const responseHandler = (msg, err_status, data, statusCode, response) => {
    console.log('In Response Handler :-');
    let reply = {
        'message': msg,              //* succeess msg *
        'error': err_status,         //true or false   
        'statusCode': statusCode
    }

    if (!err_status)
        reply.data = data;

    console.log({ 'Response sent': reply });
    response.status(statusCode).send(reply);

}
