import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

// import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { ProductType, PlanPickerType } from '../../../types/types';
import { PlanCardBottomText, PlanCardLabel } from './styles';
import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import { blue } from '../../../styles/Colors';

function PlanCard({ content }: { content: ProductType }) {
  const planInfo: PlanPickerType = { ...content };
  // console.log(content);
  const { CheckBoxLinked, updateCheckedPlanList, isEmptyList } =
    useCheckBoxLinked();

  return (
    <Card
      sx={{ borderRadius: '10px', boxShadow: 'rgb(0 0 0 / 10%) 2px 2px 20px' }}
    >
      <CardActionArea>
        <Link
          to={`./${content.product_code}`}
          state={{ product_code: content.product_code, py: content.py }}
          onClick={e => {
            if (content.moving) {
              e.preventDefault();
            }
            if (!isEmptyList()) {
              updateCheckedPlanList(e, planInfo);
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          <CardHeader
            sx={{ color: 'black' }}
            avatar={
              // <Avatar
              //   src={content.product_name}
              //   alt={content.company_name}
              //   variant="rounded"
              // />
              <Avatar
                src={`/images/CompanyLogo/${content.company_name}.png`}
                alt={content.company_name}
                variant="rounded"
                sx={{ width: 56, height: 56 }}
              />
            }
            title={
              <Typography
                sx={{
                  fontFamily: 'NotoSansKRMedium',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {content.company_name}
              </Typography>
            }
            // subheader={content.product_name}
            subheader={
              <Typography
                sx={{
                  fontFamily: 'NotoSansKRLight',
                  fontSize: '15px',
                  color: 'black',
                }}
              >
                {content.product_name}
              </Typography>
            }
            action={<CheckBoxLinked prop={planInfo} />}
          />
          <CardContent>
            <PlanCardLabel>설계 유형</PlanCardLabel>
            <PlanCardBottomText>
              {content.subtype_code == 0
                ? '실속형'
                : content.subtype_code == 1
                ? '표준형'
                : '고급형'}
            </PlanCardBottomText>
            <PlanCardLabel>보험료</PlanCardLabel>
            <PlanCardBottomText>
              {'월 ' + content.rate.toLocaleString() + '원'}
            </PlanCardBottomText>
            <ProgressBarWithNumber plan_score={content.total_index} />
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default PlanCard;
