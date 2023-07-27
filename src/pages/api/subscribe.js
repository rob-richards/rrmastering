const mailchimp = require('@mailchimp/mailchimp_marketing');
const md5 = require('md5');

const LIST_ID = process.env.WD_MAILCHIMP_LIST_ID;
const API_KEY = process.env.WD_MAILCHIMP_API_KEY;

mailchimp.setConfig({
  apiKey: API_KEY,
  server: 'us18',
});

export default async (req, res) => {
  const { comments, email, honey, name, artist } = req.body;

  if (honey) {
    return res.status(400).json({ error: 'You are a bot' });
  }

  try {
    let data;
    let md5Email;
    const interestsList = ['Inquiry'];

    if (!email || !name) {
      return res.status(400).json({ error: 'A required field is missing' });
    }

    md5Email = md5(email.toLowerCase());
    data = {
      email_address: email,
      interests: {},
      merge_fields: {
        MESSAGE: comments,
        NAME: name,
        ARTIST: artist,
      },
      status: 'subscribed',
      status_if_new: 'subscribed',
      tags: interestsList,
    };

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
