"""FastAPIのサンプルコード。
"""
from os import environ
from typing import Union

from fastapi import FastAPI, Header, status
from fastapi.responses import JSONResponse
from mangum import Mangum

from initializer import initializer
from cognito_client import cognito_client

app = FastAPI()

initializer()

COGNITO_CLIENT_ID = environ["USER_POOL_CLIENT_ID"]


@app.get("/api/ping")
def read_root():
    """`Hello World`を返す。

    Returns:
        dict: `Hello World`を含む辞書データ。
    """
    return {"Hello": "World"}


@app.get("/api/envs")
def read_envs():
    """環境変数を返す。

    Returns:
        dict: 環境変数を含む辞書データ。
    """
    return environ


@app.get("/api/verify_jwt")
def verify_jwt(authorization: Union[str, None] = Header(default=None)):
    """JWTを検証する。
    """
    if (authorization is None) or (len(authorization.split(" ")) != 2):
        content = {"message": "Invalid header."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )
    jwt = authorization.split(" ")[1]
    try:
        response = cognito_client.get_user(
            AccessToken=jwt,
        )
        name = [attr["Value"]
                for attr in response["UserAttributes"] if attr["Name"] == "name"][0]
        email = [attr["Value"] for attr in response["UserAttributes"]
                 if attr["Name"] == "email"][0]
        comment = [attr["Value"] for attr in response["UserAttributes"]
                   if attr["Name"] == "custom:comment"][0]
        content = {
            "message": "success.",
            "user": {
                "sub": response["Username"],
                "name": name,
                "email": email,
                "comment": comment,
            },
        }
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=content,
        )
    except cognito_client.exceptions.NotAuthorizedException:
        content = {"message": "Not authorized."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )
    except cognito_client.exceptions.UserNotFoundException:
        content = {"message": "User not found."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )
    except cognito_client.exceptions.InvalidParameterException:
        content = {"message": "Invalid parameter."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )


lambda_handler = Mangum(app)
