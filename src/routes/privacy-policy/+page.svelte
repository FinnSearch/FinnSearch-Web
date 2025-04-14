<svelte:head>
    <title>Privacy Policy - FinnSearch</title>
</svelte:head>


<script>
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import * as Accordion from "$lib/components/ui/accordion";
    import { cn } from "$lib/utils";

    // Define the content for the privacy policy sections
    const privacyPolicyContent = [
        {
            title: "Introduction",
            content:
                "We are committed to protecting your privacy. This Privacy Policy explains how we handle the limited personal data we collect and process when you use our services, particularly those involving Artificial Intelligence (AI) features."
        },
        {
            title: "What Information Do We Collect?",
            content:
                "We collect minimal personal information necessary for the functionality of our AI features. This may include unique user identifiers (UUIDs) or cookies required for the operation of AI services provided through third parties like Google Cloud AI and Hugging Face. We do not collect personal information you voluntarily provide unless you contact us or express interest in our services. We do not process sensitive information."
        },
        {
            title: "How Do We Process Your Information?",
            content:
                "We process the collected information (UUIDs/cookies) solely to provide, improve, and administer our AI-powered Services, ensure security, prevent fraud, and comply with legal obligations. Processing is necessary to deliver the AI functionalities offered. We may also process information to protect vital interests."
        },
        {
            title: "What Legal Bases Do We Rely On (EU/UK GDPR)?",
            content:
                "We process your information based on valid legal grounds under GDPR. This includes your consent for specific purposes (like using AI features), compliance with legal obligations, and fulfilling legitimate business interests related to providing and improving our AI services. You can withdraw your consent at any time."
        },
        {
            title: "Use of Cookies and Similar Technologies",
            content:
                "We use cookies or similar technologies that are necessary for the functionality of our AI features, provided by partners like Google Cloud AI and Hugging Face. These are essential for the AI tools to operate. Most browsers allow you to manage cookies, but disabling necessary cookies might affect the functionality of our AI services."
        },
        {
            title: "When and With Whom Do We Share Your Information?",
            content:
                "To provide AI functionalities, we may share the necessary information (like UUIDs or inputs) with our third-party AI Service Providers, specifically Google Cloud AI and Hugging Face. We have contracts with these providers to safeguard your information. They are instructed not to use your data for any other purpose and must protect it."
        },
        {
            title: "How Long Do We Keep Your Information?",
            content:
                "We retain the collected information (UUIDs/cookies) only for as long as necessary to provide the AI services. This retention period will not exceed one day. After this period, or when there is no ongoing legitimate business need, the information is deleted or anonymized."
        },
        {
            title: "How Do We Keep Your Information Safe?",
            content:
                "We implement appropriate technical and organizational security measures designed to protect the security of any limited personal information we process, in line with industry standards and our agreements with AI Service Providers."
        },
        {
            title: "What Are Your Privacy Rights (EU/UK GDPR)?",
            content:
                "Under GDPR, you have rights regarding your personal data. This includes the right to request access, rectification, erasure, or restriction of processing for the data we hold (UUIDs/cookies). You can also object to processing in certain circumstances and have the right to data portability where applicable. You can withdraw your consent at any time. To exercise these rights, please contact us. If you believe we are unlawfully processing your information, you have the right to complain to your local data protection authority."
        },
        {
            title: "Updates to This Notice",
            content:
                "We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. We will indicate updates by revising the 'Effective Date'. We encourage you to review this policy frequently."
        },
        {
            title: "How Can You Contact Us About This Notice?",
            content:
                "If you have questions or comments about this notice, you may contact us by sending us an email to: ..."
        }
    ];


    const effectiveDate = "April 12, 2025";
</script>

<div class="container mx-auto py-10">
    <Card class="w-[90%] md:w-[70%] lg:w-[60%] mx-auto">
        <CardHeader class="pb-2">
            <CardTitle class="text-2xl font-bold tracking-tight">Privacy Policy</CardTitle>
            <p class="text-sm text-muted-foreground">Effective Date: {effectiveDate}</p>
        </CardHeader>
        <CardContent class="space-y-8">
            <Accordion.Root>
            {#each privacyPolicyContent as section}
                <Accordion.Item value={section.title}>
                    <Accordion.Trigger>{section.title}</Accordion.Trigger>
                    <Accordion.Content>{section.content}</Accordion.Content>
                </Accordion.Item>
            {/each}
            </Accordion.Root>
        </CardContent>
    </Card>
</div>