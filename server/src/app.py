"""FastAPIのサンプルコード。
"""
from os import environ
from typing import Union

from cognito_client import cognito_client
from fastapi import FastAPI, Header, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from mangum import Mangum

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping")
def read_root():
    """`Hello World`を返す。

    Returns:
        dict: `Hello World`を含む辞書データ。
    """
    return {"message": "Hello World"}


@app.get("/api/envs")
def read_envs():
    """環境変数を返す。

    Returns:
        dict: 環境変数を含む辞書データ。
    """
    return environ


@app.get("/api/verify_jwt")
def verify_jwt(authorization: Union[str, None] = Header(default=None)):
    """JWTを検証する。"""
    if authorization is None:
        content = {"message": "Invalid header."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )
    splitted_authorization = authorization.split(" ")
    if (authorization is None) or (len(splitted_authorization) != 2):
        content = {"message": "Invalid header."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )
    jwt = splitted_authorization[1]
    try:
        response = cognito_client.get_user(
            AccessToken=jwt,
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=response,
        )
    except cognito_client.exceptions.NotAuthorizedException:
        content = {"message": "Not authorized."}
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=content,
        )


lambda_handler = Mangum(app)
