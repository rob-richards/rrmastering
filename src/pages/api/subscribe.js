const mailchimp = require('@mailchimp/mailchimp_marketing');
const md5 = require('md5');

const LIST_ID = process.env.WD_MAILCHIMP_LIST_ID;
const API_KEY = process.env.WD_MAILCHIMP_API_KEY;

mailchimp.setConfig({
  apiKey: API_KEY,
  server: 'us5',
});

export default async (req, res) => {
  const {
    comments,
    email,
    honey,
    name,
    artist,
  } = req.body;

  if (honey) {
    return res.status(400).json({ error: 'You are a bot' });
  }

  // Interests IDs
  // Mastering: e7a83a790b
  // Mixing: d3cc318dda
  // Inquiry: b77d0f3dea
  // HighRes: 14ed8a75c3
  // Early Access: c8f76e59dd

  try {
    let data;
    let md5Email;
    const interestsList = ['Inquiry'];

    if (updatesemail) {
      md5Email = md5(updatesemail.toLowerCase());
      data = {
        email_address: updatesemail,
        status_if_new: 'subscribed',
        tags: ['Early Access'],
        interests: {
          c8f76e59dd: true,
        },
        status: 'subscribed',
      };
    } else {
      if (!email || !name) {
        return res.status(400).json({ error: 'A required field is missing' });
      }

      md5Email = md5(email.toLowerCase());
      data = {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          COMMENTS: comments,
          NAME: name,
          ARTIST: artist,
        },
        interests: {
          b77d0f3dea: true,
          e7a83a790b: !!mastering,
          d3cc318dda: !!mixing,
        },
        tags: interestsList,
        status: 'subscribed',
      };
    }

    const response = await mailchimp.lists.setListMember(
      LIST_ID,
      md5Email,
      data
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error:
          'Sorry! There was an error receiving your info. Please email rob@robrichardsmastering.com and we will reach out as soon as possible!',
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    const { body } = error.response;

    if (body.title === 'Member Exists') {
      return res
        .status(500)
        .json({ error: `Error: ${email} is already a list member.` });
    }

    return res
      .status(500)
      .json({ error: `Error: ${error.message}` || error.toString() });
  }
};
