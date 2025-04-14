// Understanding Dependency Injectors
  // you dont create service instances yourself- instead, you request them from Angular
  // The idea behind these injectors is that they register values that can be requested by components, directives, and services.

  // The injector types are:
    // Platform Enviornment Injector; could provide values, service instances for multiple applications that are registered in one angular project. (ex. the bootStrapApplication in main.ts);

    // Application-root Enviornment Injector; more commonly used, it registers an injectable 'thing' (e.g. a service) with the App-Root Injector, so that all components, directives, and services, etc. can request the value.

    // Module Injector

    // Element Injector; always this one for which a component reaches out FIRST to request a dependency, if it doesnt get one, it moves up to the App-Root injector or Module Injector, and if it does get one there, itll go to the Platform Injector, if no value is found, you'll get an error from the nullInjector, which just tells you that you requested an instance of a service, but got NO PROVIDER for it.


    // more notes to Element Injector; a special injector that is closly tied to the DOM elements, components, and directives.
    // So if you want to inject a service into another service, the element injector is NOT really an option.