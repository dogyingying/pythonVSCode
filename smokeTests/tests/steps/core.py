# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import logging
import time

import behave

import tests


@behave.when("I wait for {seconds:n} seconds")
def sleep(context, seconds):
    time.sleep(seconds)


@behave.then("wait for {seconds:n} seconds")
def sleep(context, seconds):
    time.sleep(seconds)


@behave.then('log the message "{message}"')
def log_message(context, message):
    logging.info(message)


@behave.then("take a screenshot")
def capture_screen(context):
    tests.vscode.application.capture_screen(context)
