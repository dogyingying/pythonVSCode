// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import { inject, injectable } from 'inversify';
import { Event, EventEmitter } from 'vscode';
import { IAsyncDisposableRegistry, IDisposableRegistry, Resource } from '../../common/types';
import { IInterpreterAutoSeletionProxyService } from './types';

@injectable()
export class InterpreterAutoSeletionProxyService implements IInterpreterAutoSeletionProxyService {
    private readonly didAutoSelectedInterpreterEmitter = new EventEmitter<void>();
    private instance?: IInterpreterAutoSeletionProxyService;
    constructor(@inject(IDisposableRegistry) private readonly disposables: IAsyncDisposableRegistry) { }
    public registerInstance(instance: IInterpreterAutoSeletionProxyService): void {
        this.instance = instance;
        this.disposables.push(this.instance.onDidChangeAutoSelectedInterpreter(() => this.didAutoSelectedInterpreterEmitter.fire()));
    }
    public get onDidChangeAutoSelectedInterpreter(): Event<void> {
        return this.didAutoSelectedInterpreterEmitter.event;
    }
    public getAutoSelectedInterpreter(resource: Resource): string | undefined {
        return this.instance ? this.instance.getAutoSelectedInterpreter(resource) : undefined;
    }
}
