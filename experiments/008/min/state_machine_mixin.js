/*
 * State Machine Mixin
 *
 * Usage:
 *  class MyModel {
 *  }
 *
 *  Object.assign(MyModel.prototype, MinStateMachineMixin);
 *
 * Sources:
 * https://javascript.info/mixins
 * https://stackoverflow.com/a/56725210/1093087
**/
let MinStateMachineMixin = {
    initStates(states, initState) {
        if ( ! initState ) {
            initState = 'init';
        }

        if ( ! states.init ) {
            states.init = {};
        }

        this.states = states;
        this.enterNewState(initState);
        console.debug('init MinStateMachineMixin with state:', this.state);
        return this;
    },

    changeState(newState) {
        let oldState = this.state;
        console.debug('change state from [', oldState, '] to [', newState, ']');
        this.exitOldState(oldState);
        this.enterNewState(newState);
        return this;
    },

    enterNewState(newState) {
        this.state = newState;
        this.defaultEnter(newState);

        if ( this.states[newState]['enter'] ) {
            this.states[newState]['enter'](this);
        }
    },

    exitOldState(oldState) {
        this.defaultExit(oldState);

        if ( this.states[oldState] && this.states[oldState]['exit'] ) {
            this.states[oldState]['exit'](this);
        }
    },

    stateIs(state) {
        return this.state === state;
    },

    defaultEnter(newState) {
        console.debug('entering state', newState);
    },

    defaultExit(oldState) {
        console.debug('exiting state', oldState);
    }
};
