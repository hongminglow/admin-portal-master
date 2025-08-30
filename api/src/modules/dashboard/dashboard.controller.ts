import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { Public } from "~/modules/auth/decorators/public.decorator";
import { ApiResult } from "~/common/decorators/api-result.decorator";

class DashboardCardsDto {
  visitCount: number;
  turnover: number;
  downloadCount: number;
  dealCount: number;
}

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  @Get("cards")
  @ApiOperation({ summary: "Sample dashboard metrics" })
  @ApiResult({ type: DashboardCardsDto })
  @Public()
  async cards(): Promise<DashboardCardsDto> {
    // demo static values; replace with real metrics later
    return {
      visitCount: 9725,
      turnover: 1026,
      downloadCount: 970925,
      dealCount: 9527,
    };
  }
}
