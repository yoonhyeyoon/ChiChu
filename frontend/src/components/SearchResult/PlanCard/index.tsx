import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { ProductType } from '../../../types/types';
// import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';

function PlanCard({ content }: { content: ProductType }) {
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
