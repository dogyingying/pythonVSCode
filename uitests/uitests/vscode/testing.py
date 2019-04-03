# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import time

import behave
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

import uitests.vscode.core


def wait_for_explorer_icon(context):
    selector = ".activitybar.left .actions-container a[title='Test']"
    uitests.vscode.core.wait_for_element(context.driver, selector)


def wait_for_stop_icon(context):
    selector = "div[id='workbench.parts.sidebar'] .action-item a[title='Stop']"
    uitests.vscode.core.wait_for_element(context.driver, selector)


def wait_for_stop_hidden(context):
    selector = "div[id='workbench.parts.sidebar'] .action-item a[title='Stop']"
    uitests.vscode.core.wait_for_element_to_be_hidden(context.driver, selector)


def stop(context):
    selector = "div[id='workbench.parts.sidebar'] .action-item a[title='Stop']"
    element = uitests.vscode.core.wait_for_element(context.driver, selector)
    element.click()


def get_node_count(context):
    selector = "div[id='workbench.view.extension.test'] .monaco-tree-row"
    return len(list(uitests.vscode.core.wait_for_elements(context.driver, selector)))


def get_node_icons(context):
    selector = "div[id='workbench.view.extension.test'] .monaco-tree-row .custom-view-tree-node-item-icon"
    return uitests.vscode.core.wait_for_elements(context.driver, selector)


def get_node_icon(context, number):
    selector = f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({number}) .custom-view-tree-node-item-icon"
    return uitests.vscode.core.wait_for_element(context.driver, selector)


def get_node(context, number):
    selector = (
        f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({number})"
    )
    return uitests.vscode.core.wait_for_elements(context.driver, selector)


def _select_node(context, number):
    tree = uitests.vscode.core.wait_for_element(
        context.driver, ".monaco-tree.monaco-tree-instance-2"
    )
    tree.click()
    selector = (
        f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({number})"
    )
    element = context.driver.find_element_by_css_selector(selector)
    action = ActionChains(context.driver)
    action.context_click(element)
    action.perform()
    find = lambda ele: "focused" in ele.get_attribute("class")
    uitests.vscode.core.wait_for_element(context.driver, selector, find)
    return element


def click_node(context, number):
    element = _select_node(context, number)
    element.click()


def click_node_action_item(context, number, tooltip):
    expand_nodes(context)
    _select_node(context, number)
    action = _get_action_item(context, number, tooltip)
    action.click()


def _get_action_item(context, number, tooltip):
    selector = f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({number}) .actions .action-item a.action-label.icon[title='{tooltip}']"
    return context.driver.find_element_by_css_selector(selector)


def expand_nodes(context):
    time.sleep(0.1)
    start_time = time.time()
    while time.time() - start_time < 5:
        _expand_nodes(context)
        if get_node_count(context) > 1:
            return
        time.sleep(0.1)
    else:
        raise TimeoutError("Timeout waiting to expand all nodes")


def _expand_nodes(context):
    tree = uitests.vscode.core.wait_for_element(
        context.driver, ".monaco-tree.monaco-tree-instance-2"
    )
    tree.click()
    i = 0
    while True:
        i += 1
        selector = (
            f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({i})"
        )
        element = context.driver.find_element_by_css_selector(selector)
        action = ActionChains(context.driver)
        action.context_click(element)
        action.perform()
        find = lambda ele: "focused" in ele.get_attribute("class")
        uitests.vscode.core.wait_for_element(context.driver, selector, find)
        css_class = element.get_attribute("class")

        if "has-children" in css_class and "expanded" not in css_class:
            tree.send_keys(Keys.RIGHT)
            find = lambda ele: "expanded" in ele.get_attribute("class")
            uitests.vscode.core.wait_for_element(context.driver, selector, find)

        try:
            selector = f"div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child({i+1})"
            element = context.driver.find_element_by_css_selector(selector)
        except Exception:
            return


def get_root_node(context):
    selector = "div[id='workbench.view.extension.test'] .monaco-tree-row:nth-child(1)"
    return uitests.vscode.core.wait_for_element(context.driver, selector)
