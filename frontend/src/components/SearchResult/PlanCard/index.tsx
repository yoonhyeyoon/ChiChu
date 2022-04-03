import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from '@mui/material';

// import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { ProductType, PlanPickerType } from '../../../types/types';

function PlanCard({ content }: { content: ProductType }) {
  const planInfo: PlanPickerType = { ...content };
  const { CheckBoxLinked, updateCheckedPlanList, isEmptyList } =
    useCheckBoxLinked();

  return (
    <Card>
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
            avatar={
              <Avatar
                src={content.product_name}
                alt={content.company_name}
                variant="rounded"
              />
            }
            title={content.company_name}
            subheader={content.product_name}
            action={<CheckBoxLinked prop={planInfo} />}
          />
          <CardContent>
            <span>설계 유형</span>
            <h3>{content.subtype_code}</h3>
            <span>보험료</span>
            <h3>{content.rate}</h3>
            {/* <ProgressBarWithNumber plan_score={content.rate} /> */}
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default PlanCard;
