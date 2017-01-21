angular.module('todoApp')

    .controller('rootCtrl', function ($mdSidenav, $mdToast, todoService, fbFactory) {

        var self = this;

        var auth = fbFactory;

        self.todos = [];

        //Watch for authenticated user changes (signing in/out)
        auth.$onAuthStateChanged(function(firebaseUser) {
            self.firebaseUser = firebaseUser;
            //Initiate spinner
            self.activated = true;
            if (firebaseUser === null) {
                //Empty todos array
                self.todos = [];
                //Resolve spinner
                self.activated = false;
            } else {
                //Bind todos array to currently logged in user
                self.todos = todoService.getTodos(firebaseUser.uid);

                //Resolve spinner after data is loaded
                self.todos.$loaded(function (){
                    self.activated = false;
                });
            }
        });

        //Sign In as Demo
        self.signInDemo = function() {
            self.message = null;
            self.error = null;
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$signInWithEmailAndPassword('demo@demo.com', 'pass123').then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    console.log(firebaseUser);
                    console.log(self.message);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('Demo email: demo@demo.com & password: pass123');
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('There was a problem logging in with the demo account.');
                console.log(err);
            }
        };

        //Create New User
        self.createUser = function() {
            self.message = null;
            self.error = null;
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    console.log(firebaseUser);
                    console.log(self.message);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('User created with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('You need to feed me your email and password.');
                console.log(err);
            }
        };

        //User Log In
        self.loginUser = function() {
            self.message = null;
            self.error = null;
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$signInWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    console.log(firebaseUser);
                    console.log(self.message);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('User logged in with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('You need to feed me your email and password.');
                console.log(err);
            }
        };

        //Google User Log In
        self.googleUserLogin = function() {
            self.message = null;
            self.error = null;
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$signInWithPopup('google').then(function(result) {
                    self.message = result.user.uid;
                    console.log(result);
                    console.log(self.message);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('You are now logged in through Google.');
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong logging in through Google.');
                console.log(err);
            }
        };

        //Sign out
        self.signOut = function () {
            //Initiate spinner
            auth.$signOut().then(function () {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('Successfully logged out.');
            }).catch(function(error) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast(error);
            })
        };

        self.resetPassword = function () {
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$sendPasswordResetEmail(self.emailForReset).then(function() {
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('Reset password email has been sent.');
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong sending the reset password email.');
                console.log(err);
            }
        };

        self.deleteAcct = function () {
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$deleteUser().then(function() {
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast('Account successfully deleted.');
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong sending the reset password email.');
                console.log(err);
            }
        };

        // TOAST!
        self.toastPos = {
            bottom: false,
            top: true,
            left: true,
            right: false
        };
        self.toastPosition = angular.extend({}, self.toastPos);
        self.getToastPosition = function() {
            return Object.keys(self.toastPosition)
                .filter(function(pos) { return self.toastPosition[pos]; })
                .join(' ');
        };
        self.showToastyToast = function(paramText) {
            console.log(paramText);
            var pinTo = self.getToastPosition();
            var toast = $mdToast.simple()
                .textContent(paramText)
                .position(pinTo)
                .action('OK')
                .highlightAction(true)
                .highlightClass('md-primary');
            $mdToast.show(toast)
        };
        self.closeToast = function() {
            $mdToast.hide();
        };

        //Toggle the side menu
        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });