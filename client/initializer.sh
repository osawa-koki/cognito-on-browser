#!/bin/bash

project_name=$1
if [ -z "$project_name" ]; then
  echo "project_name is empty"
  exit 1
fi

# 配列を定義
declare array

# 配列に値をセット
array["UserPoolId"]=$(aws cloudformation describe-stacks --stack-name $project_name --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text --no-cli-pager)
array["UserPoolClientId"]=$(aws cloudformation describe-stacks --stack-name $project_name --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" --output text --no-cli-pager)

# .envファイルを作成
echo "" >> .env.local
echo "# Generated automatically by initializer.sh" >> .env.local
echo "# project_name: $project_name" >> .env.local
echo "NEXT_PUBLIC_USER_POOL_ID=\"${array["UserPoolId"]}\"" >> .env.local
echo "NEXT_PUBLIC_USER_POOL_CLIENT_ID=\"${array["UserPoolClientId"]}\"" >> .env.local
echo "" >> .env.local
