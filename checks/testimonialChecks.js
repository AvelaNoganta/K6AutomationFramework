import { check } from 'k6';

export function validateCreateTestimonialResponse(response) {
  return check(response, {
    'create testimonial status is 200 or 201': (r) =>
      r.status === 200 || r.status === 201,

    'create testimonial response has body': (r) =>
      r.body && r.body.length > 0,

    'create testimonial response has id': (r) =>
      r.json('id') !== undefined,
  });
}
