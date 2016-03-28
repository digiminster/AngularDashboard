@echo off

if "%1"=="install" (
    call npm install
    shift
)

SET mypath=%~dp0
%mypath%node_modules\.bin\electron.cmd %mypath%src\app\main.js %*
