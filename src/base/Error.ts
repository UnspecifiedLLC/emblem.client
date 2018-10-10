"use strict"

import {Logs} from "./Log"
//export module CovalType {
    export class BaseError {
        /**
         * Creates an instance of Error.
         * @param {string} message 
         * @memberof Error
         */
        constructor(public message: string ) {
            this.message = message
        }
    }

    export class MultichainError extends Error {
        cause: any
        constructor(cause: any) {
            super('An unexpected error occurred in multichain, are you connected?')
            // super('Something went wrong in multichain, are you connected?')
            this.cause = cause
            this.name = 'MultichainError'
        }
    }

    export class Errors implements IErrors {
        errors = []
        
        public Errors() {
            return this.errors
        }
        public HasErrors() {
            return this.errors.length > 0
        }

        public AddError(error: string){

            this._internalAddError(new BaseError(error))
        }

        /**
         * Internal because Error interface is
         * @param error
         */
        private _internalAddError(error: BaseError){
            this.errors.push(error)
        }
    }

    /**
     * 
     * Collection of Error
     * @interface IErrors
     */
    export interface IErrors {
        errors: Array<BaseError>
    }
//}