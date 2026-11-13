import { Component } from "@angular/core";
import { LogoCloud } from "../../components/logo-cloud/logo-cloud.component";

@Component({
  selector: "markas-example",
  imports: [LogoCloud],
  template: `
    <markas-logo-cloud
      variant="stats"
      title="The UI kit behind 2,000+ teams"
      [logos]="logos"
      [stats]="stats"
    />
  `,
})
export default class LogoCloudStatsExample {
  protected readonly logos = [
    {
      name: "Nusantara Labs",
      path: "M12 2 21 7v10l-9 5-9-5V7Z",
    },
    {
      name: "Kopi Kita",
      path: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z",
    },
    {
      name: "Sagara",
      path: "M2 13c3-4 6-4 10 0s7 4 10 0v7H2Z",
    },
    {
      name: "Rimba",
      path: "M12 3 22 21H2Z",
    },
  ];

  protected readonly stats = [
    {
      value: "2,000+",
      label: "Teams",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
  ];
}
