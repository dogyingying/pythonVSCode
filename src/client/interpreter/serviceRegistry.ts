// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { IServiceManager } from '../ioc/types';
import { InterpreterAutoSeletionService } from './autoSelection';
import { InterpreterAutoSeletionProxyService } from './autoSelection/proxy';
import { CurrentPathInterpreterSelectionStratergy } from './autoSelection/stratergies/currentPath';
import { SystemInterpreterSelectionStratergy } from './autoSelection/stratergies/system';
import { WindowsRegistryInterpreterSelectionStratergy } from './autoSelection/stratergies/windowsRegistry';
import { WorkspaceInterpreterSelectionStratergy } from './autoSelection/stratergies/workspace';
import { AutoSelectionStratergy, IBestAvailableInterpreterSelectorStratergy, IInterpreterAutoSeletionProxyService, IInterpreterAutoSeletionService } from './autoSelection/types';
import { InterpreterComparer } from './configuration/interpreterComparer';
import { InterpreterSelector } from './configuration/interpreterSelector';
import { PythonPathUpdaterService } from './configuration/pythonPathUpdaterService';
import { PythonPathUpdaterServiceFactory } from './configuration/pythonPathUpdaterServiceFactory';
import { IInterpreterComparer, IInterpreterSelector, IPythonPathUpdaterServiceFactory, IPythonPathUpdaterServiceManager } from './configuration/types';
import {
    CONDA_ENV_FILE_SERVICE,
    CONDA_ENV_SERVICE,
    CURRENT_PATH_SERVICE,
    GLOBAL_VIRTUAL_ENV_SERVICE,
    ICondaService,
    IInterpreterDisplay,
    IInterpreterHelper,
    IInterpreterLocatorHelper,
    IInterpreterLocatorProgressService,
    IInterpreterLocatorService,
    IInterpreterService,
    IInterpreterVersionService,
    IInterpreterWatcher,
    IInterpreterWatcherBuilder,
    IKnownSearchPathsForInterpreters,
    INTERPRETER_LOCATOR_SERVICE,
    InterpreterLocatorProgressHandler,
    IPipEnvService,
    IShebangCodeLensProvider,
    IVirtualEnvironmentsSearchPathProvider,
    KNOWN_PATH_SERVICE,
    PIPENV_SERVICE,
    PythonInterpreter,
    WINDOWS_REGISTRY_SERVICE,
    WORKSPACE_VIRTUAL_ENV_SERVICE
} from './contracts';
import { InterpreterDisplay } from './display';
import { InterpreterLocatorProgressStatubarHandler } from './display/progressDisplay';
import { ShebangCodeLensProvider } from './display/shebangCodeLensProvider';
import { InterpreterHelper } from './helpers';
import { InterpreterService } from './interpreterService';
import { InterpreterVersionService } from './interpreterVersion';
import { InterpreterLocatorHelper } from './locators/helpers';
import { PythonInterpreterLocatorService } from './locators/index';
import { InterpreterLocatorProgressService } from './locators/progressService';
import { CondaEnvFileService } from './locators/services/condaEnvFileService';
import { CondaEnvService } from './locators/services/condaEnvService';
import { CondaService } from './locators/services/condaService';
import { CurrentPathService, PythonInPathCommandProvider } from './locators/services/currentPathService';
import { GlobalVirtualEnvironmentsSearchPathProvider, GlobalVirtualEnvService } from './locators/services/globalVirtualEnvService';
import { InterpreterWatcherBuilder } from './locators/services/interpreterWatcherBuilder';
import { KnownPathsService, KnownSearchPathsForInterpreters } from './locators/services/KnownPathsService';
import { PipEnvService } from './locators/services/pipEnvService';
import { WindowsRegistryService } from './locators/services/windowsRegistryService';
import { WorkspaceVirtualEnvironmentsSearchPathProvider, WorkspaceVirtualEnvService } from './locators/services/workspaceVirtualEnvService';
import { WorkspaceVirtualEnvWatcherService } from './locators/services/workspaceVirtualEnvWatcherService';
import { IPythonInPathCommandProvider } from './locators/types';
import { VirtualEnvironmentManager } from './virtualEnvs/index';
import { IVirtualEnvironmentManager } from './virtualEnvs/types';

export function registerTypes(serviceManager: IServiceManager) {
    serviceManager.addSingleton<IKnownSearchPathsForInterpreters>(IKnownSearchPathsForInterpreters, KnownSearchPathsForInterpreters);
    serviceManager.addSingleton<IVirtualEnvironmentsSearchPathProvider>(IVirtualEnvironmentsSearchPathProvider, GlobalVirtualEnvironmentsSearchPathProvider, 'global');
    serviceManager.addSingleton<IVirtualEnvironmentsSearchPathProvider>(IVirtualEnvironmentsSearchPathProvider, WorkspaceVirtualEnvironmentsSearchPathProvider, 'workspace');

    serviceManager.addSingleton<ICondaService>(ICondaService, CondaService);
    serviceManager.addSingleton<IVirtualEnvironmentManager>(IVirtualEnvironmentManager, VirtualEnvironmentManager);
    serviceManager.addSingleton<IPythonInPathCommandProvider>(IPythonInPathCommandProvider, PythonInPathCommandProvider);

    serviceManager.add<IInterpreterWatcher>(IInterpreterWatcher, WorkspaceVirtualEnvWatcherService, WORKSPACE_VIRTUAL_ENV_SERVICE);
    serviceManager.addSingleton<IInterpreterWatcherBuilder>(IInterpreterWatcherBuilder, InterpreterWatcherBuilder);

    serviceManager.addSingleton<IInterpreterVersionService>(IInterpreterVersionService, InterpreterVersionService);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, PythonInterpreterLocatorService, INTERPRETER_LOCATOR_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, CondaEnvFileService, CONDA_ENV_FILE_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, CondaEnvService, CONDA_ENV_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, CurrentPathService, CURRENT_PATH_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, GlobalVirtualEnvService, GLOBAL_VIRTUAL_ENV_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, WorkspaceVirtualEnvService, WORKSPACE_VIRTUAL_ENV_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, PipEnvService, PIPENV_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IPipEnvService, PipEnvService);

    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, WindowsRegistryService, WINDOWS_REGISTRY_SERVICE);
    serviceManager.addSingleton<IInterpreterLocatorService>(IInterpreterLocatorService, KnownPathsService, KNOWN_PATH_SERVICE);
    serviceManager.addSingleton<IInterpreterService>(IInterpreterService, InterpreterService);
    serviceManager.addSingleton<IInterpreterDisplay>(IInterpreterDisplay, InterpreterDisplay);

    serviceManager.addSingleton<IPythonPathUpdaterServiceFactory>(IPythonPathUpdaterServiceFactory, PythonPathUpdaterServiceFactory);
    serviceManager.addSingleton<IPythonPathUpdaterServiceManager>(IPythonPathUpdaterServiceManager, PythonPathUpdaterService);

    serviceManager.addSingleton<IInterpreterSelector>(IInterpreterSelector, InterpreterSelector);
    serviceManager.addSingleton<IShebangCodeLensProvider>(IShebangCodeLensProvider, ShebangCodeLensProvider);
    serviceManager.addSingleton<IInterpreterHelper>(IInterpreterHelper, InterpreterHelper);
    serviceManager.addSingleton<IInterpreterLocatorHelper>(IInterpreterLocatorHelper, InterpreterLocatorHelper);
    serviceManager.addSingleton<IInterpreterComparer>(IInterpreterComparer, InterpreterComparer);

    serviceManager.addSingleton<InterpreterLocatorProgressHandler>(InterpreterLocatorProgressHandler, InterpreterLocatorProgressStatubarHandler);
    serviceManager.addSingleton<IInterpreterLocatorProgressService>(IInterpreterLocatorProgressService, InterpreterLocatorProgressService);

    serviceManager.addSingleton<IBestAvailableInterpreterSelectorStratergy<PythonInterpreter | undefined>>(IBestAvailableInterpreterSelectorStratergy, CurrentPathInterpreterSelectionStratergy, AutoSelectionStratergy.currentPath);
    serviceManager.addSingleton<IBestAvailableInterpreterSelectorStratergy<PythonInterpreter | undefined>>(IBestAvailableInterpreterSelectorStratergy, SystemInterpreterSelectionStratergy, AutoSelectionStratergy.system);
    serviceManager.addSingleton<IBestAvailableInterpreterSelectorStratergy<PythonInterpreter | undefined>>(IBestAvailableInterpreterSelectorStratergy, WindowsRegistryInterpreterSelectionStratergy, AutoSelectionStratergy.windowsRegistry);
    serviceManager.addSingleton<IBestAvailableInterpreterSelectorStratergy<PythonInterpreter | string | undefined>>(IBestAvailableInterpreterSelectorStratergy, WorkspaceInterpreterSelectionStratergy, AutoSelectionStratergy.workspace);
    serviceManager.addSingleton<IInterpreterAutoSeletionProxyService>(IInterpreterAutoSeletionProxyService, InterpreterAutoSeletionProxyService);
    serviceManager.addSingleton<IInterpreterAutoSeletionService>(IInterpreterAutoSeletionService, InterpreterAutoSeletionService);
}
