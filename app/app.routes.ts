import { Routes, CanActivateFn } from '@angular/router';

// Import components directly
import { HomePage } from './components/home/home.page';
import { LoginInComponent } from './components/login-in/login-in.component';
import { ShopComponent } from './components/shop/shop.component';
import { RegistrationFormComponent } from './components/login-in/registration-form/registration-form.component';
import { PaymentComponent } from './components/shop/payment/payment.component';
import { TermsComponent } from './components/login-in/registration-form/terms/terms.component';
import { ReviewComponent } from './components/review/review.component';
import { ExploreComponent } from './components/explore/explore.component';
import { DestinationCardComponent } from './components/shop/destination-card/destination-card.component';
import { PropularDestinationsComponent } from './components/home/propular-destinations/propular-destinations.component';
import { RecommendationComponent } from './components/home/recommendation/recommendation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthGuard } from './service/Auth/authGuard/auth-guard';
import { TaskComponent } from './components/secret-file/task/task.component';
import { SecretFile } from './components/secret-file/secret-file';

export const routes: Routes = [

  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'login',
    component: LoginInComponent,
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent,
  },
  {
    path: 'propular-destinations',
    component: PropularDestinationsComponent,
  },
  {
    path: 'destination-card',
    component: DestinationCardComponent,
  },
  {
    path: 'recommendation',
    component: RecommendationComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'secre-file',
    component: SecretFile,
  },
{
  path: 'shop',
  component: ShopComponent,
  //canActivate: [AuthGuard],
},
{
  path: 'payment',
  component: PaymentComponent,
  //canActivate: [AuthGuard],
},
  {
    path: 'footer',
    component: FooterComponent,
   // canActivate: [AuthGuard],
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'home',
  }

];
