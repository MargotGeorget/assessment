// Interfaces to facilitate API data recovery management

interface ServiceInit {
  // Define the state of the web service before any action 
  status: 'init';
}
interface ServiceLoading {
  // Define the state of the web service while loading 
  status: 'loading';
}
interface ServiceLoaded<T> {
  // Store the data loaded from the web service in the property payload 
  status: 'loaded';
  payload: T;
}
interface ServiceError {
  // Allows to store any error that may occur in the property error  
  status: 'error';
  error: Error;
}

// Allow to deal with web services that have multiple states
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;