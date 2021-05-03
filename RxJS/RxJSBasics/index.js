// Demonstrating how Observables work
import { Observable, fromEvent, of, range, from, interval } from "rxjs";

// Observables provide the ability to asynchronously "emit" or "push" events to items that need to react to those events

// A new Observable accepts a function which accepts a subscriber, which it will call when it has completed its operation.
// The "subscriber", then, is an object that "observes" the observer and reacts to its events.
const observable = new Observable((subscriber) => {
  // Calling next "pushes" (aka "emits") a value to the subscriber
  subscriber.next("Hello");
  subscriber.next("World");
  // Calling complete signals to the subscriber that no more events will be emitted
  subscriber.complete();
});

// A Subscriber is an object that reacts to events pushed from an Observer.
// A subscriber is a "wrapped, safe version" of an observer. They can be more-or-less thought of as the same thing.
const subscriber = {
  // A subscriber/observer needs 3 "callback" functions. Note that if any of these are not defined, they will be stubbed out with default implementations.

  // next is for reacting to normal events emitted from the observable
  next: (value) => console.log("next", value),

  // error is for reacting to errors emitted by the observable
  error: (error) => console.log("error", error),

  // complete is for reacting to the observable completing it's operation. Once complete is called by an observable,
  // the subscriber won't accept/react to any more events.
  complete: () => console.log("complete!"),
};

// subscribe hooks the observer/subscriber to the observable and triggers the observable to emit its events.
// Observables are "cold" and won't do anything until subscribe is called.
observable.subscribe(subscriber);

// It's also possible to directly pass the required functions instead of an object
observable.subscribe(
  (value) => console.log("next2", value),
  (error) => console.log("error2", error),
  () => console.log("complete2!")
);

// Demonstrating how Observables can deliver values asynchronously
const asynchronousObservable = new Observable((subscriber) => {
  let count = 0;

  // setInterval is a standard JavaScript function that accepts a function which will execute in a loop on a given delay (in this case 1000ms)
  const id = setInterval(() => {
    subscriber.next(count);
    count += 1;
  }, 1000);

  // We can return a "clean-up" function from this function that will be called whenever a subscriber unsubscribes from an observable (see below)
  return () => {
    console.log("clean-up function called");
    clearInterval(id);
  };
});

console.log("before");

// Calling subscribe actually returns a "subscription" object, which allows the observable to be cancelled by calling "unsubscribe".
// Unsubscribe calls the function that is "returned" in the function passed to the Observable constructor (the "clean up" function we defined above).
const subscription = asynchronousObservable.subscribe(subscriber);
setTimeout(() => {
  subscription.unsubscribe();
}, 3500);

// This will be printed before anything in the observable is emitted, because the call to "subscribe" is asynchronous, and we introduced a delay in the observable
console.log("after");

// Subscriptions can also be "added" together and cleaned up all at once
const subscription2 = asynchronousObservable.subscribe(subscriber);
const subscription3 = asynchronousObservable.subscribe(subscriber);
subscription2.add(subscription3);
setTimeout(() => {
  subscription2.unsubscribe();
}, 2000);

// Demonstrating "creation operators" for Observables. These are standalone functions that create Observables from a "producer" of data (aka a "source").
// These operators allow us to not have to manually call the Observable constructor and manage it as we did above.

// The "fromEvent" creation operator creates an observable from some DOM event, such as a mouse click on an element
const source = fromEvent(document, "click");

// The value pushed to the observer in this case will be the details of the mouse click event
const observer = {
  next: (val) => console.log("next", val),
  error: (err) => console.log("error", err),
  complete: () => console.log("complete!"),
};

const subOne = source.subscribe(observer);

// It's very important to clean up subscriptions to prevent memory leaks. There are ways to automate we will see later on.
setTimeout(() => {
  console.log("unsubscribing");
  subOne.unsubscribe();
}, 3000);

// The "of" creation operator crates an observable from some a comma-separated list of data
const source2 = of(1, 2, 3, 4, 5);
source2.subscribe(observer);
// "of" is synchronous (i.e. Hello will be printed after the observable is finished)
console.log("Hello");

// The equivalent behavior with the "range" operator would be:
range(1, 5);

// Demonstrating the "from" creation operator
// from is a "more intelligent" version of "of" that accepts lists, iterators, promises, etc.

// This has the same behavior as the "of" call above
from([1, 2, 3, 4, 5]);

// "fetch" does an HTTP request and returns a Promise, which we can pass to the from operator. This will operate asynchronously and will only
// emit once a response is received for the request
const source3 = from(fetch("https://api.github.com/users/octocat"));
source3.subscribe(observer);
