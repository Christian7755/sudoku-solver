import { NgModel } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PlayLoginComponent } from "./play-login/play-login.component";
import { PlayComponent } from "./play/play.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    //Routing der Hauptseite
    { path: '', component: HomeComponent},
    { path: 'play-login', component: PlayLoginComponent},
    { path: 'play', component: PlayComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}